import './App.css'
import { Stack , Flex, Grid, Container, Button, Input} from "@chakra-ui/react"
import React, { useEffect, useState, createContext, useContext } from "react";

function App() {

  class Item {
    constructor(name, description, price, quantity) {
      this.id = Math.floor(Math.random()*10000)
      this.name = name;
      this.description = description;
      this.price = price;
      this.quantity = quantity;
    }
  }
  
  // Получить продукты из базы данных
  const [items, setItems] = useState([])
  const [actual_item, setActualItem] = useState({})
  const fetchItems = async () => {
    //const response = await fetch("http://localhost:8000/items")
    //const items = await response.json()
    //setItems(items.data)

    // Временно пока нет базы данных, генерируем на фронтэнде
    let items_generated = []
    for (let i = 0; i < 5; i++) {
      let new_item = new Item (
      "Имя" +  Math.floor(Math.random()*10) ,
      "Описание товара может быть разным",
      Math.floor(Math.random()*1000),
      Math.floor(Math.random()*10+1),
      )
      items_generated.push(new_item)
    }
    setItems([...items_generated]);
    setActualItem(items_generated[0])
  }

  const ItemsContext = createContext({
    items: [], actual_item: {}, fetchItems: () => {}, setItems: () => {}
  })

  useEffect(() => {
    fetchItems()
  }, [])

  // Добавление нового товара и форма
  const [newName, setNewName] = useState("");
  function handleNewName (e) {
    setNewName(e.target.value)
  }
  const [newDescription, setNewDescription] = useState("");
  function handleNewDescription (e) {
    setNewDescription(e.target.value)
  }
  const [newPrice, setNewPrice] = useState("");
  function handleNewPrice (e) {
    setNewPrice(e.target.value)
  }
  const [newQuantity, setNewQuantity] = useState("");
  function handleNewQuantity (e) {
    setNewQuantity(e.target.value)
  }
 
  return (
    <ItemsContext.Provider value={{items, actual_item, fetchItems, setItems}}>
     <Stack>
      <h1><b>Маркет</b></h1>
      <Flex justify="center" gap="4">
        <div id="actual-photo">фото</div>
        <div id="actual-description">
          <p><b>Название: </b>{actual_item.name}</p>
          <p><b>Описание: </b>{actual_item.description}</p>
          <p><b>Цена: </b>{actual_item.price}</p>   
          <p><b>Количество: </b>{actual_item.quantity}</p>   
          <Button colorPalette="red" onClick={()=>{
            const updatedItems = items.filter((item) => item.id !== actual_item.id);
            setItems(updatedItems);
            setActualItem(updatedItems[0])
          }}>Удалить</Button>
        </div>
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap="6">
        {  
          items.map((item, i)=>{
            return <Stack id={i} key={"stack"+i} className="item">
              <p key={"name"+i}>{item.name}</p>
              <p key={"price"+i}>Цена: {item.price}</p>
              <Button key={"button"+i} onClick={()=>{
                actual_item.id = i;
                setActualItem(items[i])
              }}>Подробнее</Button>
              </Stack>
          })
        }
      </Grid>
      <Container maxW={"xl"}>
          <Input value={newName} onChange={handleNewName} placeholder="Название" />
          <Input value={newDescription} onChange={handleNewDescription} placeholder="Описание" />
          <Input value={newPrice} onChange={handleNewPrice} placeholder="Цена" />
          <Input value={newQuantity} onChange={handleNewQuantity} placeholder="Колличество" />
          <Button onClick={()=>{
              let new_item = new Item (
               newName,
               newDescription,
               newPrice,
               newQuantity
              )
              items.push(new_item)
              setItems([...items]);
          }}colorPalette="blue">Добавить</Button>
      </Container>
     </Stack>
    </ItemsContext.Provider>
  )
}

export default App
