import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteFood, getFoods } from "./services/foodsApi";
import Button from "./shared/Button";
import Heading from "./shared/Heading";

export default function Menu() {
  const foodQuery = useQuery(["foods"], getFoods);

  const queryClient = useQueryClient();

  const foodMutation = useMutation(deleteFood, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["foods"]);
      toast.success("Food deleted! 🍟");
    },
    onError: () => {
      toast.error("Error deleting food 😢");
    },
  });

  if (foodQuery.isLoading) return <p>Loading...</p>;
  if (foodQuery.isError) throw foodQuery.error;

  return (
    <>
      <Heading level={2}>Menu</Heading>
      <div className="flex flex-wrap">
        {foodQuery.data.map((food) => {
          return (
            <div
              key={food.name}
              className="hover:bg-indigo-600 hover:text-white p-2 shadow-lg border max-w-sm m-2 rounded"
            >
              <Heading level={3}>{food.name}</Heading>
              <img
                className="h-52"
                src={"/images/" + food.image}
                alt={food.name}
              />
              <p>{food.description}</p>
              <p>${food.price}</p>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  foodMutation.mutate(food.id);
                }}
              >
                Delete
              </Button>
            </div>
          );
        })}
        {foodQuery.isFetching && <p>Checking for new food...</p>}
      </div>
    </>
  );
}
