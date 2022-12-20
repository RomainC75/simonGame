import {it, expect, vi, describe, beforeEach} from 'vitest'
import { Display } from './display'

import {Window} from "happy-dom"

import fs from 'fs'
import path from 'path'
const htmlDocPath = path.join(process.cwd(), 'index.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()
// const htmlDocumentContent = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

const window = new Window()
const document = window.document

vi.stubGlobal("document", document)
let display

beforeEach(()=>{
    document.body.innerHTML=''
    document.write(htmlDocumentContent)
    // display = new Display()
})

describe('display tests', ()=>{

    it('should create an instance of the "Display" class', ()=>{
        const el = document.querySelector('#play')
        expect(el).not.toBeNull()

    })
})
