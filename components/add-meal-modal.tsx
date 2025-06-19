"use client";
import {useState, useEffect} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {z} from "zod";

const mealSchema = z.object({
	name: z.string().min(2, "Name is required"),
	price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
		message: "Price must be a positive number",
	}),
	image: z.string().url("Image must be a valid URL").optional().or(z.literal("")),
	restaurant: z.string().min(2, "Restaurant name is required").optional().or(z.literal("")),
	logo: z.string().url("Logo must be a valid URL").optional().or(z.literal("")),
	status: z.enum(["Open", "Closed"]),
});

type MealForm = z.infer<typeof mealSchema>;

type AddOrEditMealModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	mode: "add" | "edit";
	initialValues?: Partial<MealForm>;
	onSubmit: (values: MealForm) => Promise<void>;
	loading?: boolean;
	error?: string | null;
};

export default function AddOrEditMealModal({open, onOpenChange, mode, initialValues = {}, onSubmit, loading = false, error}: AddOrEditMealModalProps) {
	const [form, setForm] = useState<MealForm>({
		name: "",
		price: "",
		image: "",
		restaurant: "",
		logo: "",
		status: "Open",
		...initialValues,
	});
	const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof MealForm, string>>>({});

	// Real-time validation
	useEffect(() => {
		const result = mealSchema.safeParse(form);
		if (!result.success) {
			const errors: Partial<Record<keyof MealForm, string>> = {};
			result.error.errors.forEach((err) => {
				const field = err.path[0] as keyof MealForm;
				errors[field] = err.message;
			});
			setFieldErrors(errors);
		} else {
			setFieldErrors({});
		}
	}, [form]);

	useEffect(() => {
		if (open) {
			setForm({
				name: "",
				price: "",
				image: "",
				restaurant: "",
				logo: "",
				status: "Open",
				...initialValues,
			});
			setFieldErrors({});
		}
		// Only depend on open to avoid infinite loop
		// If you want to support changing initialValues while open, use a memoized value
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setForm({...form, [e.target.name]: e.target.value});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = mealSchema.safeParse(form);
		if (!result.success) {
			const errors: Partial<Record<keyof MealForm, string>> = {};
			result.error.errors.forEach((err) => {
				const field = err.path[0] as keyof MealForm;
				errors[field] = err.message;
			});
			setFieldErrors(errors);
			return;
		}
		await onSubmit(form);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{mode === "add" ? "Add New Meal" : "Edit Meal"}</DialogTitle>
					<DialogDescription>{mode === "add" ? "Fill in the details to add a new meal." : "Update the details and save changes."}</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'
				>
					<div>
						<Input
							name='name'
							placeholder='Meal Name'
							value={form.name}
							onChange={handleChange}
							required
						/>
						{fieldErrors.name && <div className='text-red-600 text-xs mt-1'>{fieldErrors.name}</div>}
					</div>
					<div>
						<Input
							name='price'
							placeholder='Price'
							type='number'
							min='0'
							value={form.price}
							onChange={handleChange}
							required
						/>
						{fieldErrors.price && <div className='text-red-600 text-xs mt-1'>{fieldErrors.price}</div>}
					</div>
					<div>
						<Input
							name='image'
							placeholder='Image URL'
							value={form.image}
							onChange={handleChange}
						/>
						{fieldErrors.image && <div className='text-red-600 text-xs mt-1'>{fieldErrors.image}</div>}
					</div>
					<div>
						<Input
							name='restaurant'
							placeholder='Restaurant Name'
							value={form.restaurant}
							onChange={handleChange}
						/>
						{fieldErrors.restaurant && <div className='text-red-600 text-xs mt-1'>{fieldErrors.restaurant}</div>}
					</div>
					<div>
						<Input
							name='logo'
							placeholder='Restaurant Logo URL'
							value={form.logo}
							onChange={handleChange}
						/>
						{fieldErrors.logo && <div className='text-red-600 text-xs mt-1'>{fieldErrors.logo}</div>}
					</div>
					<div>
						<select
							name='status'
							value={form.status}
							onChange={handleChange}
							className='w-full border rounded px-3 py-2'
						>
							<option value='Open'>Open</option>
							<option value='Closed'>Closed</option>
						</select>
						{fieldErrors.status && <div className='text-red-600 text-xs mt-1'>{fieldErrors.status}</div>}
					</div>
					{error && <div className='text-red-600 text-sm'>{error}</div>}
					<DialogFooter>
						<Button
							type='submit'
							disabled={loading || Object.keys(fieldErrors).length > 0}
							className='bg-primary text-white'
						>
							{loading ? (mode === "add" ? "Adding..." : "Saving...") : mode === "add" ? "Add Meal" : "Save Changes"}
						</Button>
						<DialogClose asChild>
							<Button
								type='button'
								variant='secondary'
							>
								Cancel
							</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
