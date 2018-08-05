import * as R from "@effectful/es-persist-serialization"
import React from "react"
import ReactDOM from "react-dom"
import * as D from "./draw"
import {share} from "./kit"

jest.mock("react-dom")

test("collectBoxes", async () => {
  expect.assertions(10)
  for await(const i of D.collectBoxes(share([
    {type:"ROOT", value:<div id="root"/>},
    {type:"BOX", key:2, value:<div id="box-2"/>},
    {type:"BOX", key:1, value:<div id="box-1"/>},
    {type:"BOX", key:3, value:<div id="box-3"/>},
    {type:"DELETE", key:2, value:<div id="box-1"/>}   
  ]))) {
    expect(el).toMatchSnapshot()
  }
})

test("rootContainer", async () => {
  expect.assertions(8)
  const event = (opts) => opts
  for await(const i of D.rootContainer(share([
    {type:"START", key:10, x:100, y:200, button:0},
    {type:"MARK", key:10, x:110, y:220},
    {type:"MARK", key:10, x:120, y:240},
    {type:"DONE", key:10, x:150, y:260},
    {type:"STOP"}
  ]), event)) {
    expect(i).toMatchSnapshot()
    if (i.type === "STOP")
      break
  }
})

test("insertBox", async () => {
  expect.assertions(7)
  const event = (opts) => opts
  global.window = {pageXOffset: 1000, pageYOffset: 2000}
  for await(const i of D.insertBox([
    {type:"START", key:10, x:100, y:200, button:0},
    {type:"MARK", key:10, x:110, y:220, start: {x: 100, y: 200}},
    {type:"MARK", key:10, x:120, y:240, start: {x: 100, y: 200}},
    {type:"DONE", key:10, x:150, y:260, start: {x: 100, y: 200}}
  ], event)) {
    expect(i).toMatchSnapshot()
  }
})

test("animateDelete", async () => {
  expect.assertions(8)
  let time = 0
  global.performance = {now:() => time}
  global.requestAnimationFrame = cb => cb(time += 200)
  global.window = {pageXOffset: 1000, pageYOffset: 2000}
  for await(const i of D.animateDelete({delay:1000})([
    {type:"SOMETHING", value:<div id="box"/>},
    {type:"DELETE", key:1, x:20, y:40, rect:{x:10,y:20,width:100,height:1000}}
  ])) {
    expect(i).toMatchSnapshot()
  }
})

