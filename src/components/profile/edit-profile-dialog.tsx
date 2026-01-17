"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { MemberRegistrationForm } from "@/components/forms/member-registration-form";
import { type MemberFormValues } from "@/lib/validations";

interface EditProfileDialogProps {
  initialData: MemberFormValues;
}

export function EditProfileDialog({ initialData }: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Pencil size={14} className="mr-2" />
          Edit Personal Info
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your professional and personal information.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <MemberRegistrationForm 
            initialData={initialData} 
            onSuccess={() => {setOpen(false);}} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
