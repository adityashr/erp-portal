import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

function Fee() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [feeInfo, setFeeInfo] = useState(null);
  const [payments, setPayments] = useState([]);
  const [amount, setAmount] = useState("");
  const [paying, setPaying] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/");
      return;
    }

    Promise.all([api.get("/students/dashboard"), api.get("/students/fees/payments")])
      .then(([dashboardResponse, paymentResponse]) => {
        setFeeInfo(paymentResponse.data.summary || dashboardResponse.data.fee);
        setPayments(paymentResponse.data.payments || []);
      })
      .catch((err) => {
        console.error(err);
        setFeeInfo({
          semesterFee: 0,
          examFee: 0,
          libraryFine: 0,
          paid: 0,
          due: 0,
          total: 0,
          dueDate: new Date().toISOString(),
        });
      })
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user || user.role !== "student") return null;

  const total = feeInfo?.total || 0;
  const due = feeInfo?.due || 0;

  const handlePayment = async (event) => {
    event.preventDefault();
    setPaying(true);
    setPaymentMessage("");
    setPaymentError("");

    try {
      const response = await api.post("/students/fees/payments/order", {
        amount: Number(amount),
      });

      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = resolve;
          script.onerror = () => reject(new Error("Unable to load Razorpay checkout."));
          document.body.appendChild(script);
        });
      }

      const checkout = new window.Razorpay({
        key: response.data.keyId,
        amount: response.data.order.amount,
        currency: response.data.order.currency,
        name: "College ERP",
        description: `Semester ${response.data.payment.semester} fee payment`,
        order_id: response.data.order.id,
        prefill: { name: user.name, email: user.email },
        theme: { color: "#136b5d" },
        handler: async (gatewayResponse) => {
          try {
            const verification = await api.post("/students/fees/payments/verify", gatewayResponse);
            setFeeInfo(verification.data.summary);
            setPayments((current) => [verification.data.payment, ...current]);
            setAmount("");
            setPaymentMessage(
              `${verification.data.message} Transaction: ${verification.data.payment.transactionId}`,
            );
          } catch (error) {
            setPaymentError(error.response?.data?.message || "Payment verification failed.");
          } finally {
            setPaying(false);
          }
        },
      });

      checkout.on("payment.failed", (failure) => {
        setPaymentError(failure.error?.description || "Payment failed. No amount was recorded.");
        setPaying(false);
      });
      checkout.open();
    } catch (error) {
      setPaymentError(error.response?.data?.message || "Payment could not be recorded.");
      setPaying(false);
    }
  };

  return (
    <DashboardLayout
      user={user}
      profile={user}
      onLogout={() => {
        logout();
        navigate("/");
      }}
    >
      {loading ? (
        <p className="text-sm text-[#70837e]">Loading fee details...</p>
      ) : (
        <div className="space-y-6">
          <div className="rounded-xl border border-[#dce8e4] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#81948f]">
              Fee Overview
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#193e37]">Tuition & Fee Status</h1>
            <p className="mt-2 text-sm leading-6 text-[#60746e]">
              Review your current fee summary and pending payment details for the current semester.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <p className="text-sm text-[#70837e]">Semester Fee</p>
              <p className="mt-3 text-3xl font-bold text-[#136b5d]">
                ₹{(feeInfo?.semesterFee || 0).toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <p className="text-sm text-[#70837e]">Exam Fee</p>
              <p className="mt-3 text-3xl font-bold text-[#136b5d]">
                ₹{(feeInfo?.examFee || 0).toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <p className="text-sm text-[#70837e]">Library Fine</p>
              <p className="mt-3 text-3xl font-bold text-[#136b5d]">
                ₹{(feeInfo?.libraryFine || 0).toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <p className="text-sm text-[#70837e]">Amount Due</p>
              <p className="mt-3 text-3xl font-bold text-[#c65b41]">₹{due.toLocaleString()}</p>
            </div>
          </div>

          <div className="rounded-xl border border-[#dce8e4] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#173e38]">Fee Breakdown</h2>
                <p className="mt-1 text-sm text-[#637872]">
                  Total payable for this semester, including all pending charges.
                </p>
              </div>
              <p className="rounded-full bg-[#eaf5ef] px-4 py-2 text-sm font-semibold text-[#136b5d]">
                Due by {new Date(feeInfo?.dueDate || Date.now()).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-xl bg-[#f9fcfb] p-4">
                <p className="text-sm text-[#526b65]">Paid</p>
                <p className="mt-2 text-2xl font-bold text-[#136b5d]">
                  ₹{(feeInfo?.paid || 0).toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl bg-[#fff7f6] p-4">
                <p className="text-sm text-[#84605b]">Remaining</p>
                <p className="mt-2 text-2xl font-bold text-[#c65b41]">₹{due.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-[#f3f7f5] p-4">
                <p className="text-sm text-[#526b65]">Total</p>
                <p className="mt-2 text-2xl font-bold text-[#136b5d]">₹{total.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-[#f7fdf9] p-4 text-sm text-[#4d6f60]">
              <p className="font-semibold">Note</p>
              <p className="mt-2">
                If you need help with fee payment or want to request an installment plan, please
                contact the student support desk.
              </p>
            </div>

            <form
              onSubmit={handlePayment}
              className="mt-6 rounded-xl border border-[#dce8e4] bg-[#fbfdfc] p-4"
            >
              <h3 className="font-semibold text-[#234941]">Pay pending amount</h3>
              <p className="mt-1 text-sm text-[#637872]">
                Secure payment through the college Razorpay account.
              </p>
              {paymentMessage && (
                <p className="mt-3 rounded-lg bg-[#ecf7ee] p-3 text-sm text-[#1e5a38]">
                  {paymentMessage}
                </p>
              )}
              {paymentError && (
                <p className="mt-3 rounded-lg bg-[#fff1f1] p-3 text-sm text-[#9f1c1c]">
                  {paymentError}
                </p>
              )}
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  type="number"
                  min="1"
                  max={due}
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder={`Amount up to ₹${due.toLocaleString()}`}
                  className="rounded-lg border border-[#dce8e4] px-3 py-2.5 outline-none focus:border-[#136b5d]"
                  disabled={!due || paying}
                  required
                />
                <button
                  type="submit"
                  disabled={!due || paying}
                  className="rounded-lg bg-[#136b5d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f564a] disabled:opacity-50"
                >
                  {paying ? "Processing..." : "Pay now"}
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-xl border border-[#dce8e4] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#173e38]">Payment history</h2>
            <div className="mt-4 space-y-3">
              {payments.length === 0 ? (
                <p className="text-sm text-[#70837e]">No online payments recorded.</p>
              ) : (
                payments.map((payment) => (
                  <div
                    key={payment._id}
                    className="flex flex-col gap-1 rounded-lg bg-[#f7faf9] p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-[#294b44]">{payment.transactionId}</p>
                      <p className="text-xs text-[#81938e]">
                        {new Date(payment.paidAt).toLocaleString()} · {payment.method}
                      </p>
                    </div>
                    <span className="font-semibold text-[#136b5d]">
                      ₹{payment.amount.toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Fee;
