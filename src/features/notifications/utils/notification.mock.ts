// src/features/notifications/utils/notification.mock.ts

import type {
  ActivityItem,
  NotificationCenterSummary,
  NotificationItem,
  TaskItem,
} from "../types/notification.types";

export function getMockNotifications(): NotificationItem[] {
  return [
    {
      id: "notif-1",
      title: "Insurance claim requires review",
      message: "Claim CLM-1028 is waiting for approval.",
      type: "approval",
      priority: "high",
      status: "unread",
      module: "insurance",
      href: "/insurance",
      entity_type: "insurance_claim",
      entity_id: "claim-1028",
      created_at: "Today, 10:45 AM",
    },
    {
      id: "notif-2",
      title: "Critical lab result available",
      message: "A lab result has been marked critical and needs attention.",
      type: "warning",
      priority: "urgent",
      status: "unread",
      module: "lis",
      href: "/lis",
      entity_type: "lab_result",
      entity_id: "lab-884",
      created_at: "Today, 10:10 AM",
    },
    {
      id: "notif-3",
      title: "OPD queue threshold exceeded",
      message: "Current OPD waiting queue is above configured threshold.",
      type: "warning",
      priority: "normal",
      status: "read",
      module: "opd",
      href: "/opd",
      created_at: "Today, 09:35 AM",
      read_at: "Today, 09:40 AM",
    },
  ];
}

export function getMockActivities(): ActivityItem[] {
  return [
    {
      id: "activity-1",
      title: "Patient registered",
      description: "New patient record was created.",
      module: "patients",
      actor_name: "Reception User",
      entity_type: "patient",
      entity_id: "pat-1001",
      created_at: "Today, 11:00 AM",
    },
    {
      id: "activity-2",
      title: "Invoice payment received",
      description: "Billing payment of ₹18,500 was recorded.",
      module: "billing",
      actor_name: "Billing User",
      entity_type: "invoice",
      entity_id: "inv-2044",
      created_at: "Today, 10:20 AM",
    },
    {
      id: "activity-3",
      title: "Insurance claim approved",
      description: "Claim CLM-1024 was approved.",
      module: "insurance",
      actor_name: "Insurance Desk",
      entity_type: "insurance_claim",
      entity_id: "claim-1024",
      created_at: "Today, 09:55 AM",
    },
  ];
}

export function getMockTasks(): TaskItem[] {
  return [
    {
      id: "task-1",
      title: "Review pending insurance claim",
      description: "Claim CLM-1028 requires review before settlement.",
      priority: "high",
      status: "open",
      module: "insurance",
      assigned_to_name: "Insurance Manager",
      href: "/insurance",
      due_at: "Today, 05:00 PM",
      created_at: "Today, 10:45 AM",
    },
    {
      id: "task-2",
      title: "Confirm OT preparation",
      description: "OT room setup confirmation pending.",
      priority: "urgent",
      status: "in_progress",
      module: "ot",
      assigned_to_name: "OT Coordinator",
      href: "/ot",
      due_at: "Today, 01:00 PM",
      created_at: "Today, 09:30 AM",
    },
    {
      id: "task-3",
      title: "Verify pharmacy stock warning",
      description: "Medicine stock has reached reorder level.",
      priority: "normal",
      status: "open",
      module: "pharmacy",
      assigned_to_name: "Pharmacy Admin",
      href: "/pharmacy",
      due_at: "Tomorrow",
      created_at: "Today, 08:45 AM",
    },
  ];
}

export function getMockNotificationSummary(): NotificationCenterSummary {
  return {
    unread_count: 2,
    urgent_count: 1,
    open_tasks_count: 2,
    today_activity_count: 12,
  };
}