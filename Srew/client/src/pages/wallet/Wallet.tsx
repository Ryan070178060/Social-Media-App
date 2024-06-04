import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageLoading from "../../components/PageLoading";
import { env } from "../../env";
import {
    formatResourceURL,
    handleProfileImageError,
} from "../../services/asset-paths";
import { getUserId } from "../../services/auth";
import { create, get } from "../../services/crud";
import { getName } from "../../services/utils";
import WalletHeader from "./components/WalletHeader";

export default function Wallet() {
  const [walletInfo, setWalletInfo] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [rechargeLoading, setRechargeLoading] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const userId = getUserId();
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${env.VITE_PAYPAL_CLIENT_ID}&currency=USD`;
    script.addEventListener("load", () => setPageLoading(false));
    document.body.appendChild(script);
    fetchWalletInfo();
  }, []);

  const fetchWalletInfo = () => {
    setPageLoading(true);
    get("wallet/" + userId + "/info")
      .then((res) => {
        setWalletInfo(res.data);
        setPageLoading(false);
      })
      .catch((e) => {
        console.log(e);
        toast.error(
          e?.response?.data?.message ?? "Error! couldn't load wallet info"
        );
        setPageLoading(false);
      });
  };

  const loadToWallet = () => {
    if (!rechargeAmount) {
      return;
    }

    setRechargeLoading(true);
    create("wallet/create-order", {
      amount: rechargeAmount,
    })
      .then((res) => {
        showPayPalButton(res.data);
      })
      .catch((e) => {
        console.error(e);
        toast.error(
          e?.response?.data?.message ?? "Error! couldn't update balance"
        );
        setRechargeLoading(false);
      });
  };

  const showPayPalButton = (order: any) => {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (_data: any, actions: { order: { create: (arg0: { purchase_units: { amount: { value: any; }; }[]; }) => any; }; }) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: order.amount
              }
            }]
          });
        },
        onApprove: (data: any, actions: { order: { capture: () => Promise<any>; }; }) => {
          return actions.order.capture().then(_details => {
            verifyPayment(data, order.amount);
          });
        },
        onError: (err: any) => {
          console.error(err);
          toast.error("Error! payment failed.");
          setRechargeLoading(false);
        }
      }).render('#paypal-button-container');
    } else {
      console.error("PayPal SDK not loaded");
      toast.error("Error! PayPal SDK not loaded.");
      setRechargeLoading(false);
    }
  };

  const verifyPayment = (paymentInfo: any, amount: number) => {
    create("wallet/verify", { ...paymentInfo, amount, userId })
      .then((res) => {
        toast.success("Balance updated successfully");
        setWalletInfo(res.data);
        setRechargeLoading(false);
        setRechargeAmount(0);
      })
      .catch((e) => {
        toast.error(
          e?.response?.data?.message ?? "Error! couldn't update balance"
        );
        setRechargeLoading(false);
      });
  };

  const navigateToUserProfile = () => {
    navigate("/profile/" + walletInfo?.user?.username);
  };

  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <WalletHeader />

      <div className="page-content bg-gradient-2 min-vh-100">
        <div className="container profile-area">
          <div className="edit-profile">
            <div className="profile-image">
              <div className="media media-100 rounded-circle position-relative">
                <img
                  src={formatResourceURL(walletInfo?.user?.profile_img)}
                  onError={handleProfileImageError}
                  onClick={navigateToUserProfile}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="d-flex flex-column align-items-center">
                <span
                  className="fw-bold"
                  onClick={navigateToUserProfile}
                  style={{ cursor: "pointer" }}
                >
                  {getName(
                    walletInfo?.user ?? {
                      first_name: "trest",
                      last_name: "asd",
                    }
                  )}
                </span>
                <span
                  className=""
                  onClick={navigateToUserProfile}
                  style={{ cursor: "pointer" }}
                >
                  @{walletInfo?.username ?? "asdasd"}
                </span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="m-3 align-center">Wallet Balance</h3>
              <h4 className="text-secondary">
                <i className="fa fa-usd me-1"></i>
                <span>{walletInfo.balance}</span>
              </h4>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (rechargeAmount && !rechargeLoading) {
                  loadToWallet();
                }
              }}
              className="d-flex align-items-center flex-column"
            >
              <div className="mb-3 px-1">
                {walletInfo.user?.contact_no && (
                  <label className="w-100 mb-2">
                    <span>Contact number:</span>
                    &nbsp;
                    <span className="fw-bold">
                      {walletInfo.user.contact_no}
                    </span>
                  </label>
                )}
                {walletInfo.user?.email && (
                  <label className="w-100 mb-2">
                    <span>Email:</span>
                    &nbsp;
                    <span className="fw-bold">{walletInfo.user.email}</span>
                  </label>
                )}
                <label className="w-100 mb-2" htmlFor="amount">
                  Amount:
                </label>
                <input
                  id="amount"
                  type="number"
                  className="form-control numberInput"
                  placeholder=""
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(parseInt(e.target.value))}
                  min={0}
                />
              </div>
              <div>
                <button style={{alignItems:"center"}}
                  disabled={!rechargeAmount || rechargeLoading}
                  className="btn btn-secondary"
                  type="submit"
                >
                  {rechargeLoading ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    <span>Load to Wallet</span>
                  )}
                </button>
                <div id="paypal-button-container" style={{padding:20}}></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
