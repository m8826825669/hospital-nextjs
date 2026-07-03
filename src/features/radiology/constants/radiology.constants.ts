// src/features/radiology/constants/radiology.constants.ts

export const modalityOptions = [
  { label: "X-Ray", value: "xray" },
  { label: "CT", value: "ct" },
  { label: "MRI", value: "mri" },
  { label: "Ultrasound", value: "ultrasound" },
  { label: "Mammography", value: "mammography" },
  { label: "Fluoroscopy", value: "fluoroscopy" },
  { label: "Other", value: "other" },
];

export const bodyPartOptions = [
  { label: "Head / Brain", value: "Head" },
  { label: "Chest", value: "Chest" },
  { label: "Abdomen", value: "Abdomen" },
  { label: "Pelvis", value: "Pelvis" },
  { label: "Spine", value: "Spine" },
  { label: "Upper Limb", value: "Upper Limb" },
  { label: "Lower Limb", value: "Lower Limb" },
  { label: "Whole Body", value: "Whole Body" },
];

export const radiologyPriorityOptions = [
  { label: "Routine", value: "routine" },
  { label: "Urgent", value: "urgent" },
  { label: "STAT", value: "stat" },
];

export const radiologyOrderStatusOptions = [
  { label: "Ordered", value: "ordered" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Patient Arrived", value: "patient_arrived" },
  { label: "In Progress", value: "in_progress" },
  { label: "Images Uploaded", value: "images_uploaded" },
  { label: "Reporting", value: "reporting" },
  { label: "Reported", value: "reported" },
  { label: "Verified", value: "verified" },
  { label: "Approved", value: "approved" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export const radiologyReportStatusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Reported", value: "reported" },
  { label: "Verified", value: "verified" },
  { label: "Approved", value: "approved" },
  { label: "Amended", value: "amended" },
];

export const radiologyRoomOptions = [
  { label: "X-Ray Room 1", value: "X-Ray Room 1" },
  { label: "CT Suite", value: "CT Suite" },
  { label: "MRI Suite", value: "MRI Suite" },
  { label: "Ultrasound Room", value: "Ultrasound Room" },
  { label: "Portable Imaging", value: "Portable Imaging" },
];
