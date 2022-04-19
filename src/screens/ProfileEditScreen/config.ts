import { Field } from './components/ProfileForm'

interface Section {
  id: string
  heading?: string
  fields: Field[]
}

export const MAX_SYMBOLS_BIO = 250

export const sections: Section[] = [
  {
    id: 'basicInfo',
    fields: [
      {
        id: 'name',
        label: 'Name',
        placeholder: 'Name',
        textContentType: 'name',
        autoCapitalize: 'words',
      },
      {
        id: 'username',
        label: 'Username',
        placeholder: 'Username',
        textContentType: 'username',
        autoCapitalize: 'none',
      },
      {
        id: 'bio',
        label: 'Bio',
        placeholder: 'Describe yourself',
        autoCapitalize: 'sentences',
        multiline: true,
        maxLength: MAX_SYMBOLS_BIO,
      },
    ],
  },
  {
    id: 'PrivateInfo',
    heading: 'Private Information',
    fields: [
      {
        id: 'email',
        label: 'Email',
        placeholder: 'Email',
        editable: false,
      },
      {
        id: 'phoneNumber',
        label: 'Phone',
        placeholder: 'Phone',
        textContentType: 'telephoneNumber',
      },
    ],
  },
]
