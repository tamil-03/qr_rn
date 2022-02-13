import { useEffect, useState } from "react";
import qrApi from "../api/qr_data";
import notifier from "../utilities/notifier";

const useQR = () => {
  const [code, setCode] = useState("");
  const [codeData, setCodeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const getData = async (name) => {
    setLoading(true);
    setError(false);

    if (name === code || !name) return setLoading(false);

    const [data, e] = await qrApi.getQrData(name);

    if (e) {
    } else {
      setCode(name);
      if (data && data.data && data.data.length > 0 && data.data[0]) {
        const result = data.data[0];

        if (typeof result === "object") {
          setCodeData(result);
        } else {
          setCodeData({});
          notifier.toastShort("Error occured, please restart the app");
        }
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return { code, codeData, loading, error, getData, setLoading };
};

export default useQR;
