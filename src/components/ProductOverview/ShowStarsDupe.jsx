import { ImStarFull, ImStarEmpty, ImStarHalf } from "react-icons/im";
import { IconContext } from "react-icons";

const ShowStarsDupe = (props) => {
  if (props.data === undefined) {
    return;
  }

  let arr = props.data.results;
  let avg = 0;
  for (let i = 0; i < arr.length; i++) {
    avg = arr[i].rating + avg;
  }
  avg = avg / props.data.results.length;
  avg = avg.toFixed(1);

  return (
    <div>
      <div className="flex">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <div key={index}>
              <IconContext.Provider value={{ color: "#ffcd3c" }}>
                <div>
                  {avg >= index ? <ImStarFull size={16} /> : avg < index && avg > index - 1 ? <ImStarHalf size={18} /> : <ImStarEmpty size={18} />}
                </div>
              </IconContext.Provider>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowStarsDupe;
