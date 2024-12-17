import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useNavigation } from "expo-router";
import React, { useCallback, useRef } from "react";
import { useState, useEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function ItemBox({
  item,
  itemBoxes,
  setItemBoxes,
  addItemBox,
  deleteItemBox,
  tickedItemBoxes,
  setTickedItemBoxes,
}) {
  //Variables
  const navigation = useNavigation();

  let colorScheme = useColorScheme();

  // State
  const [isInputActive, setIsInputActive] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // Refs
  const inputRefs = useRef();

  // useEffects
  // useEffect(() => {
  //   console.log(inputRefs.current.isFocused());
  // }, [isInputActive]);

  // Listen for checking of fields
  useEffect(() => {
    itemBoxes.map((item) => {
      if (item.checked) {
        //console.log(item);
        setTickedItemBoxes([...tickedItemBoxes, item]);

        setItemBoxes((prev) =>
          prev.filter((itemToDelete) => item.id !== itemToDelete.id)
        );
      }
    });
  }, [itemBoxes]);

  // Functions

  return (
    <View className="flex-row items-center mt-1 p-2 rounded h-10">
      <Checkbox
        color={colorScheme === "dark" ? "gray" : "black"}
        value={item.checked}
        onValueChange={() => {
          const updatedItems = itemBoxes.map((box) =>
            box.id === item.id ? { ...box, checked: !box.checked } : box
          );
          setItemBoxes(updatedItems);
          //console.log(item);
        }}
        className="mr-2 p-2"
      />
      <TextInput
        keyboardAppearance={colorScheme === "dark" ? "dark" : "light"}
        className={`w-[200px] h-10 p-2 text-[18px] flex-1 outline-none  ${
          item.checked ? "line-through" : ""
        } ${colorScheme === "dark" ? "text-white" : ""}`}
        value={item.item}
        autoFocus={!item.checked}
        onChangeText={(text) => {
          const updatedItems = itemBoxes.map((box) =>
            box.id === item.id ? { ...box, item: text } : box
          );
          setItemBoxes(updatedItems);
        }}
        ref={(e) => (inputRefs.current = e)}
        onBlur={() => setIsInputActive(false)}
        onFocus={() => setIsInputActive(true)}
        submitBehavior="submit"
        onSubmitEditing={() => {
          addItemBox();
        }}
      />

      {isInputActive && (
        <TouchableOpacity onPress={() => deleteItemBox(item.id, false)}>
          <Ionicons
            name="close"
            size={25}
            color={`${colorScheme === "dark" ? "white" : "black"}`}
            className="ml-2"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
