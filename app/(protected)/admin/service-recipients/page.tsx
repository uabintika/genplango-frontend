"use client";

import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/axios";
import { API_ROUTES } from "@/routes/api";
import { Loader2 } from "lucide-react";
import useSWRInfinite from "swr/infinite";

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.data) return null;

  if (pageIndex === 0) return API_ROUTES.SERVICE_RECIPIENTS.INDEX;

  return `${API_ROUTES.SERVICE_RECIPIENTS.INDEX}?cursor=${previousPageData.nextCursor}`;
};

const serviceRecipientsFetcher = (url: string) => {
  return api.get(url).then((res) => {
    console.log(res.data);
    return res.data;
  });
};

export default function ServiceRecipientsPage() {
  const { data, isLoading, size, setSize } = useSWRInfinite(
    getKey,
    serviceRecipientsFetcher
  );

  return (
    <>
      <Card>
        <CardContent className="p-0">
          {isLoading && <Loader2 className="h-20 w-20 mx-auto animate-spin" />}
        </CardContent>
      </Card>
    </>
  );
}
