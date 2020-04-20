import pizza_1 from "../../images/pizza_1.png";
import pizza_2 from "../../images/pizza_2.png";
import pizza_3 from "../../images/pizza_3.png";
import pizza_4 from "../../images/pizza_4.png";
import pizza_5 from "../../images/pizza_5.png";
import pizza_6 from "../../images/pizza_6.png";
import pizza_7 from "../../images/pizza_7.png";
import pizza_8 from "../../images/pizza_8.png";

import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
} from "../actions/typeActions";

const initState = {
  items: [
    {
      id: 1,
      title: "Cheese Lovers",
      desc:
        "Mozzarella Cheese, Parmesan Cheese & Mozzarella Strings",
      price: 4,
      img: pizza_1,
    },
    {
      id: 2,
      title: "Splitza",
      desc:
        "Splitza",
      price: 5,
      img: pizza_2,
    },
    {
      id: 3,
      title: "Veggie Garden",
      desc:
        "Corn, Mushrooms, Mozarella Cheese, Red Peppers, Green Peppers, Bombay Onions.",
      price: 6,
      img: pizza_3,
    },
    {
      id: 4,
      title: "Meat Lovers",
      desc:
        "Sliced ​​beef sausage, minced beef, beef burger, chicken sausage.",
      price: 3,
      img: pizza_4,
    },
    {
      id: 5,
      title: "Super Supreme",
      desc:
        "Chicken and smoked beef, minced beef, beef burgers, mushrooms, red bell peppers and green bell peppers.",
      price: 5,
      img: pizza_5,
    },
    {
      id: 6,
      title: "Tuna Melt",
      desc:
        "Tuna meat slices, corn grains, mayonnaise sauce.",
      price: 3,
      img: pizza_6,
    },
    {
      id: 7,
      title: "Frankfurter BBQ",
      desc:
        "Frankfurter beef sausage, beef cuts, honey BBQ, mustard, Mozarella cheese.",
      price: 4,
      img: pizza_7,
    },
    {
      id: 8,
      title: "American Favourite",
      desc:
        "Beef pepperoni, minced beef, mushroom.",
      price: 6,
      img: pizza_8,
    },
  ],
  addedItems: [],
  total: 0,
};

const API = (state = initState, action) => {

    //INSIDE HOME COMPONENT
  if (action.type === ADD_TO_CART) {
    let addedItem = state.items.find((item) => item.id === action.id);
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find((item) => action.id === item.id);
    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + addedItem.price,
      };
    } else {
      addedItem.quantity = 1;
      //calculating the total
      let newTotal = state.total + addedItem.price;

      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
      };
    }
  }

  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find((item) => action.id === item.id);
    let new_items = state.addedItems.filter((item) => action.id !== item.id);

    //calculating the total
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    console.log(itemToRemove);
    return {
      ...state,
      addedItems: new_items,
      total: newTotal,
    };
  }

  //INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal,
    };
  }

  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter((item) => item.id !== action.id);
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        total: newTotal,
      };
    }
  }

  if (action.type === ADD_SHIPPING) {
    return {
      ...state,
      shipping: 6,
      total: state.total + 6,
    };
  }

  if (action.type === "SUB_SHIPPING") {
    return {
      ...state,
      shipping: 6,
      total: state.total - 6,
    };
  } else {
    return state;
  }
};

export default API;
