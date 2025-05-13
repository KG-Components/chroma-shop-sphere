
import { useToast, toast } from "@/hooks/use-toast";

// Configure default toast styles with the sircony color
toast.success = (message) => {
  toast({
    title: "Success",
    description: message,
    className: "bg-sircony text-white",
  });
};

toast.error = (message) => {
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
};

export { useToast, toast };
