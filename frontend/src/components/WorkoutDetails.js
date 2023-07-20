import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const openWorkout = () => {
    const url = "/api/workouts/" + workout._id;
    window.open(url, "_blank");
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Weight (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNowStrict(new Date(workout.createdAt), {
          addSuffix: true,
        })}
      </p>
      <div>
        <span onClick={handleClick} className="material-symbols-outlined">
          delete
        </span>
        <span className="material-symbols-outlined open" onClick={openWorkout}>
          open_in_new
        </span>
      </div>
    </div>
  );
};

export default WorkoutDetails;
