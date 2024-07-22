"use client"
import { createProject, State } from "@/app/actions";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { toast } from "sonner";
import Image from "next/image";
import { SubmitButton } from "@/app/components/Common/SubmitButtons";
import { FilePlus, Plus } from "lucide-react";
import { AddButton } from "@/app/components/Common/AddButton";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categoryItems } from "@/app/lib/CategoryTypes";

export default function CreateProject() {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(createProject, initialState);
    const [image, setImage] = useState<string>();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);


    return (
        <Sheet>
            <SheetTrigger asChild>
                {/* <div className="w-full h-40 border flex justify-center items-center rounded-lg bg-card">
                    <Plus size={10}/>
                </div> */}
                <AddButton variant="outline"><FilePlus className='mr-2' /> Add Project</AddButton>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-full lg:max-w-[800px] max-h-[100vh] overflow-y-auto p-4">
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input id="name" name="name" placeholder="ProjectsHub" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="creator">Project Creator</Label>
                        <Input id="creator" name="creator" placeholder="Anas Nadkar" />
                    </div>
                    <div className="space-y-2">
                        <input type="hidden" name="category" value={selectedCategory || ""} />
                        <Label htmlFor="category">Project Category</Label>
                        <Select onValueChange={(value) => setSelectedCategory(value)}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-card">
                                <SelectGroup>
                                    {categoryItems.map((item) => (
                                        <SelectItem
                                            key={item.id}
                                            value={item.name}
                                        >
                                            {item.title}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Project Description</Label>
                        <Textarea id="description" name="description" placeholder="The name of an project is projectshub" />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <input type="hidden" name="image" value={JSON.stringify(image)} />
                        <Label>Project Thumbnail</Label>
                        <UploadDropzone
                            className="border-accent"
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                const uploadedUrl = res[0].url;
                                setImage(uploadedUrl);
                                toast.success("Your images have been uploaded");
                            }}
                            onUploadError={(error: Error) => {
                                toast.error("Something went wrong, try again");
                            }}
                        />
                        {image && (
                            <div className="flex w-full justify-center">
                                <Image
                                    src={image}
                                    alt="Uploaded Project Thumbnail"
                                    width={200}
                                    height={200}
                                    className="rounded"
                                />
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="projectLink">Project Deployed Link</Label>
                        <Input id="projectLink" name="projectLink" placeholder="https://dev-zenith-v2.vercel.app/" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="githubLink">Project Github Link</Label>
                        <Input id="githubLink" name="githubLink" placeholder="https://github.com/anasnadkar45/DevZenith-v2/" />
                    </div>

                    <SheetFooter className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-end">
                        <SheetClose asChild type="submit">
                            <SubmitButton text="Add Project" />
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet >
    )
}
