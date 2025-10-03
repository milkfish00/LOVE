import { type SchemaTypeDefinition } from 'sanity'
import { home } from './home'
import { about } from './about'
import {tuition} from "./tuition"
import { program } from './programs'
import { resources } from './resources'
import { gallery } from './gallery'
import { careers } from './careers'
import { contact } from './contact'
import { settings } from './settings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, about, tuition, program, resources,gallery,careers, contact, settings],
}
