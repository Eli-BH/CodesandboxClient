import React from "react";

type NotificationType = {
  title: string;
  subTitle: string;
  body: string;
  type: string;
};

const NotificationItem = ({
  title,
  subTitle,
  body,
  type,
}: NotificationType): JSX.Element => {
  return <div>NotificationItem</div>;
};

export default NotificationItem;
