import React from "react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
const I9iFrame = (): JSX.Element => {
  const [sfid, setSfid] = useState<String>("");
  const [userState, setUserState] = useState("");
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

        console.log(response?.data);
        setSfid(response?.data.sfid);
        setUserState(response?.data?.state || "NY");
      } catch (error) {
        console.log(error);
      }
    };

    fetchSfid();
  }, []);
  // https://freedomcareny--lightning.sandbox.lightning.force.com/lightning/n/I9Page

  // https://freedomcareny.my.salesforce-sites.com/issProject?recordId=${sfid}&state=NY&ShowRecordType=EmploymentDocs

  //freedomcareny.my.salesforce-sites.com/issProject?recordId=0034v00003KcowQAAR&state=PA

  https: return (
    <>
      <iframe
        id="documents"
        src={`https://freedomcareny.my.salesforce-sites.com/issProject?recordId=${sfid}&state=${userState}&ShowRecordType=EmploymentDocs`}
        title="document management"
        className="w-full h-full"
      ></iframe>
    </>
  );
};

export default I9iFrame;
