import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { foodTags, NewFood } from "./food";
import { addFood } from "./services/foodsApi";
import Button from "./shared/Button";
import Checkbox from "./shared/Checkbox";
import CheckboxList from "./shared/CheckboxList";
import Heading from "./shared/Heading";
import Input from "./shared/Input";

const emptyFood: NewFood = {
  name: "",
  image: "",
  price: 0,
  description: "",
  tags: [],
};

export type Errors = {
  name?: string;
  image?: string;
  price?: string;
  description?: string;
  tags?: string;
};

export type Touched = {
  name?: boolean;
  image?: boolean;
  price?: boolean;
  description?: boolean;
  tags?: boolean;
};

type FormStatus = "idle" | "submitting" | "submitted" | "error";

export default function Admin() {
  const [food, setFood] = useState(emptyFood);
  const [touched, setTouched] = useState<Touched>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const queryClient = useQueryClient();

  const foodMutation = useMutation(addFood, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["foods"]);
      toast.success("Food added! 🍔");
      setStatus("idle");
      setFood(emptyFood);
      setTouched({});
    },
    onError: () => {
      toast.error("Error adding food 😢");
      setStatus("error");
    },
  });

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    // React injects the current state value when a function is passed to setState
    setFood((currentFood) => ({ ...currentFood, [id]: value }));
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const { id } = event.target;
    setTouched((currentTouched) => ({ ...currentTouched, [id]: true }));
  }

  function validate() {
    const newErrors: Errors = {};
    if (!food.name) {
      newErrors.name = "Name is required";
    }
    if (!food.image) {
      newErrors.image = "Image filename is required";
    }
    if (!food.price) {
      newErrors.price = "Price is required";
    }
    if (!food.description) {
      newErrors.description = "Description is required";
    }
    if (food.tags.length === 0) {
      newErrors.tags = "At least one tag is required";
    }
    return newErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.scrollTo(0, 0);

    // If someone already has clicked submit, don't run this again.
    // Yes, we could delete the button, but this is nicer for accessibility.
    if (status === "submitting") return;

    setStatus("submitting");
    if (!isValid) {
      setStatus("submitted");
      return;
    }

    foodMutation.mutate(food);
  }

  function getError(id: keyof Errors) {
    return status === "submitted" || touched[id] ? errors[id] : "";
  }

  if (status === "error") {
    throw new Error("Something went wrong");
  }

  return (
    <>
      <Heading level={2}>Admin</Heading>

      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          label="Name"
          className="my-4"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={food.name}
          error={getError("name")}
        />
        <Input
          id="description"
          label="Description"
          className="my-4"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={food.description}
          error={getError("description")}
        />
        <Input
          id="price"
          label="Price"
          type="number"
          className="my-4"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={food.price.toString()}
          error={getError("price")}
        />
        <Input
          id="image"
          label="Image filename"
          className="my-4"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={food.image}
          error={getError("image")}
        />
        <CheckboxList label="Tags" error={getError("tags")}>
          {foodTags.map((tag) => (
            <Checkbox
              key={tag}
              id={tag}
              label={tag}
              checked={food.tags.includes(tag)}
              onChange={(event) => {
                setFood((currentFood) => {
                  const { checked } = event.target;
                  const tags = checked
                    ? [...currentFood.tags, tag]
                    : currentFood.tags.filter((t) => t !== tag);
                  return { ...currentFood, tags };
                });
              }}
            />
          ))}
        </CheckboxList>
        <Button className="block mt-4" variant="primary" type="submit">
          {status === "submitting" ? "Saving..." : "Save"}
        </Button>
      </form>
    </>
  );
}
