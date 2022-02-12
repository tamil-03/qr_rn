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

    if (name === code || !name) return;

    const [data, e] = await qrApi.getQrData(name);

    if (e) {
    } else {
      setCode(name);
      setCodeData(data.data[0]);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return { code, codeData, loading, error, getData };
};

export default useQR;
