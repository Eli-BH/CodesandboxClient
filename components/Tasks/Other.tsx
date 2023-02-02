import React from "react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Other = () => {
  const [sfid, setSfid] = useState<String>("");
  const { data } = useSession();

  useEffect(() => {
    const fetchSfid = async () => {
      try {
        const response = await axios.post(
          "https://mysteps.freedomcare.com/api/getSfid",
          {
            email: data?.user?.email,
          }
        );

        setSfid(response?.data.sfid);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSfid();
  }, []);

  return (
    <>
      <iframe
        id="documents"
        src={`https://freedomcareny--lightning.sandbox.lightning.force.com/lightning/n/I9Page?id=${sfid}&AppLogin=TRUE&Form=CovidVaccineCard&ShowRecordType=OtherDocs`}
        title="document management"
        className="w-full h-full"
      ></iframe>
    </>
  );
};

export default Other;
