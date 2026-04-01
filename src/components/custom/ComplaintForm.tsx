"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addComplaint } from "@/lib/data";
import { ROUTES } from "@/lib/routes";

export default function ComplaintForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    images: [] as string[],
  });
  const [errors, setErrors] = useState({
    title: "",
    subject: "",
    images: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (formData.images.length + files.length > 4) {
      setErrors({ ...errors, images: "Maximum 4 images allowed" });
      return;
    }

    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);
        if (newImages.length === files.length) {
          setFormData({
            ...formData,
            images: [...formData.images, ...newImages],
          });
          setErrors({ ...errors, images: "" });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { title: "", subject: "", images: "" };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Create complaint
    const newComplaint = addComplaint({
      title: formData.title,
      subject: formData.subject,
      images: formData.images,
      status: "unresolved",
      userId: "user1",
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to complaints list
    router.push(ROUTES.DASHBOARD_COMPLAINTS);
  };

  return (
    <Card className="bg-white border-gray-200 text-gray-900 shadow-sm">
      <CardHeader>
        <CardTitle className="text-(--color-primary)">
          Submit a New Complaint
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Brief description of the issue"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={`bg-white text-gray-900 border-gray-300 focus-visible:ring-(--color-primary) placeholder:text-gray-400 ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-gray-700">
              Subject
            </Label>
            <Textarea
              id="subject"
              placeholder="Detailed description of the complaint..."
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className={`bg-white text-gray-900 border-gray-300 focus-visible:ring-(--color-primary) placeholder:text-gray-400 min-h-37.5 resize-none ${
                errors.subject ? "border-red-500" : ""
              }`}
            />
            {errors.subject && (
              <p className="text-xs text-red-500">{errors.subject}</p>
            )}
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label className="text-gray-700">Images (Maximum 4)</Label>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="h-full w-full rounded-md object-cover border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {formData.images.length < 4 && (
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 hover:border-(--color-primary) transition-colors bg-gray-50 hover:bg-gray-100">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="mt-2 text-xs text-gray-500">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            {errors.images && (
              <p className="text-xs text-red-500">{errors.images}</p>
            )}
          </div>

          {/* Status (Read-only) */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-gray-700">
              Status
            </Label>
            <Input
              id="status"
              value="unresolved"
              readOnly
              disabled
              className="cursor-not-allowed bg-gray-100 text-gray-500 border-gray-300"
            />
            <p className="text-xs text-gray-500">
              Status is automatically set to &quot;unresolved&quot;
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-(--color-primary) text-white hover:bg-(--color-primary)/90 font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
