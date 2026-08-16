import { AppLayout } from "@/components/common/app-layout.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NotificationRow from "./components/notification-card-row.tsx";
import { EmptyState } from "@/components/common/empty-friend-card.tsx";
import { NotificationSkeleton } from "@/components/common/messageSkeleton.tsx";
import { readNotificationApi } from "./apis/read-notification/index.ts";
import { BellOff } from "lucide-react";
import NotificationDialog from "./components/notification-dialog.tsx";
import { useState } from "react";
import type { Notification } from "./apis/notification/type.ts";
import { NotificationsApi } from "./apis/notification/index.ts";
import {
  useAcceptFriendRequest,
  useRejectFriendRequest,
} from "../friends/hooks/index.ts";

function Notifications() {
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDialogOpen(true);

    if (!notification.isRead) {
      handleRead(notification.notificationId);
    }
  };

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["all-notifications"],
    queryFn: NotificationsApi,
  });

  const notifications = data?.data ?? [];

  const readNotificationMutation = useMutation({
    mutationFn: readNotificationApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["unread-notification-count"],
      });
    },
  });
  const { mutate: acceptRequest, isPending: isAcceptingRequest } =
    useAcceptFriendRequest();

  const { mutate: rejectRequest, isPending: isRejectingRequest } =
    useRejectFriendRequest();
  const handleRead = (notificationId: string) => {
    readNotificationMutation.mutate(notificationId);
  };

  const handleAccept = (Id: string) => {
    acceptRequest(Id);
  };

  const handleReject = (Id: string) => {
    rejectRequest(Id);
  };

  return (
    <AppLayout
      title="Notifications"
      subtitle="Stay updated with your latest activity and alerts"
    >
      <div className="mx-auto max-w-3xl space-y-3">
        {isLoading ? (
          <NotificationSkeleton />
        ) : notifications.length === 0 ? (
          <EmptyState
            icon={BellOff}
            title="No notifications"
            description="When something happens on Nexora, you'll find it here."
          />
        ) : (
          notifications.map((item: Notification) => (
            <NotificationRow
              key={item.notificationId}
              item={item}
              onClick={() => handleNotificationClick(item)}
            />
          ))
        )}
      </div>

      <NotificationDialog
        notification={selectedNotification}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        handleAccept={handleAccept}
        handleReject={handleReject}
        isAcceptingRequest={isAcceptingRequest}
        isRejectingRequest={isRejectingRequest}
      />
    </AppLayout>
  );
}

export default Notifications;
