// @ts-nocheck conflicting hadlessui/react version

// TODO: Update headless UI react
// TODO: implement confirmation dialogue for destructive action

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PropsWithChildren, useState } from "react";

type Props = PropsWithChildren & {
  id: string;
};

function Example() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogPanel className="max-w-lg space-y-4 bg-white p-12">
          <DialogTitle className="font-bold">Deactivate account</DialogTitle>
          <Description>
            This will permanently deactivate your account
          </Description>
          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed.
          </p>
          <div className="flex gap-4">
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button onClick={() => setIsOpen(false)}>Deactivate</button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
