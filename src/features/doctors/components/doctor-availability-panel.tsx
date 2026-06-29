// src/features/doctors/components/doctor-availability-panel.tsx

"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";

import type { Doctor } from "../types/doctor.types";
import { useDoctorAvailableSlots } from "../api/doctors.queries";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/shared/components/enterprise";

export function DoctorAvailabilityPanel({ doctor }: { doctor: Doctor }) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);

  const slotsQuery = useDoctorAvailableSlots(doctor.id, date);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-medium">Available Slots</h3>
        <p className="text-sm text-muted-foreground">
          View appointment availability for a selected date.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Date</label>
        <Input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        {slotsQuery.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading slots...</p>
        ) : slotsQuery.data?.length ? (
          slotsQuery.data.map((slot, index) => (
            <div
              key={`${slot.start_time}-${index}`}
              className="flex items-center justify-between rounded-lg border bg-card p-3 text-sm"
            >
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span>
                  {slot.start_time} - {slot.end_time}
                </span>
              </div>

              <StatusBadge
                label={slot.available ? "Available" : "Booked"}
                variant={slot.available ? "success" : "muted"}
              />
            </div>
          ))
        ) : (
          <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
            No slots found for this date.
          </p>
        )}
      </div>
    </div>
  );
}