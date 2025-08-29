import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type DialogDemoProps = {
  textDialogTrigger: string;
  textDialogTitle: string;
  textDialogDescription: string;
  textDialogClose: string;
  textDialogSave?: string;
};

export function DialogDemo({
  textDialogTrigger,
  textDialogTitle,
  textDialogDescription,
  textDialogClose,
  textDialogSave = "Save changes",
}: DialogDemoProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">{textDialogTrigger}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{textDialogTitle}</DialogTitle>
            <DialogDescription>{textDialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{textDialogClose}</Button>
            </DialogClose>
            <Button type="submit">{textDialogSave}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
