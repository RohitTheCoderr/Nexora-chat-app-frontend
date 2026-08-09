import { Spinner } from "@/components/ui/spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <Spinner className="size-6" />
    </div>
  );
};

export default Loader;
