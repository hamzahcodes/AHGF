import { toast } from "react-toastify";

export function toastAlert(mssg) {
  toast.success(mssg, {
    theme: "dark",
    position:'bottom-center'
  });
}
