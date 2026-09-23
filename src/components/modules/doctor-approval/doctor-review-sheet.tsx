"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Toast, toast } from "@/components/ui/toast";
import { useApproveDoctor, useGetAllDoctors } from "@/hooks";
import { ApproveDoctorPayload, DoctorParams } from "@/types";
import { useState } from "react";
interface Props extends DoctorParams {
  selectedId: string;
  onClose: () => void;
}

export default function DoctorReviewSheet({
  selectedId,
  onClose,
  ...params
}: Props) {
  const [confirmRejection, setConfirmationRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data } = useGetAllDoctors(params);
  const { mutate: verify, isPending } = useApproveDoctor();

  const selectedDoctor = data?.data?.find((doctor) => doctor.id === selectedId);
  const handleClose = () => {
    setConfirmationRejection(false);
    setRejectionReason("");
    onClose();
  };

  const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
    const reviewData: ApproveDoctorPayload = {
      doctorId: selectedId,
      verificationStatus: status,
      rejectionReason: rejectionReason,
    };

    verify(reviewData, {
      onSuccess: (res) => {
        if (res.success) {
          toast.add({
            title: "Success",
            description: `Doctor has been ${status.toLowerCase()}`,
            type: "success",
          });
          handleClose();
        }
      },
      onError: (error) => {
        const apiError = error as Error & {
          data?: {
            message?: string;
          };
        };
        console.log("from error", apiError.data);
        toast.add({
          title: "Failed Changing approval status",
          description: apiError.data?.message ?? `Doctor Status not changed`,
          type: "Error",
        });
      },
    });
  };

  if (!selectedId) return null;
  return (
    <Sheet open={!!selectedId} onOpenChange={handleClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Review and Take Action</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
        Doctor Name: {selectedDoctor?.name}
        Doctor Id: {selectedDoctor?.id}
        <SheetFooter>
          {confirmRejection ? (
            <div className="flex flex-col gap-2">
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Provide the reason for rejection"
              />

              <div className="flex gap-3">
                <Button onClick={handleClose} variant="outline" size="lg">
                  Cancel
                </Button>
                <Button
                  onClick={() => handleReviewAction("REJECTED")}
                  variant="destructive"
                  className="flex-1"
                  size="lg"
                  disabled={!rejectionReason}
                >
                  confirm Rejection
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <Button
                onClick={() => setConfirmationRejection(true)}
                variant="destructive"
                size="lg"
                className="flex-1"
              >
                Reject{" "}
              </Button>
              <Button
                onClick={() => handleReviewAction("APPROVED")}
                variant="default"
                size="lg"
                className="flex-1"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Spinner className="animate-spin" /> Approving...
                  </>
                ) : (
                  "Approve"
                )}
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
