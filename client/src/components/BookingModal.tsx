import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * BookingModal Component
 * Integrates Bokadirekt booking widget for Her World Studio
 * Business ID: 131326
 */
export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-0">
        <DialogHeader className="sticky top-0 bg-white border-b border-gray-200 p-6 flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-gray-900">Boka din tid</DialogTitle>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </DialogHeader>
        
        <div className="p-6">
          {/* Bokadirekt Embedded Widget */}
          <iframe
            src="https://www.bokadirekt.se/places/her-world-studio-131326/embed"
            width="100%"
            height="700"
            frameBorder="0"
            title="Boka tid - Her World Studio"
            style={{
              border: "none",
              borderRadius: "8px",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
