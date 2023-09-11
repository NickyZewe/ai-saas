"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("420d0bef-8293-4dbd-abce-efaebfd6277a");
  }, []);

  return null;
};
