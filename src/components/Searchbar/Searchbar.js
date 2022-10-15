import {  useState } from "react";
import { toast } from "react-toastify";
import { Form,SearchbarWrap, SearchFormButton, SearchFormInput, SearchFormLabel } from "./Searchbar.styled";




export const Searchbar = ({onSubmit}) => {
const [search, setSearch] = useState('')
  const handleInput = (e) => {
  setSearch(e.currentTarget.value.toLowerCase().trim() )
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search === '') {
      toast.error('write something');
      return;
    }
    onSubmit(search)
    setSearch('')
  }


  return (
        <SearchbarWrap>
  <Form className="form" onSubmit={handleSubmit}>
    <SearchFormButton type="submit">
      <SearchFormLabel>Search</SearchFormLabel>
    </SearchFormButton>

    <SearchFormInput
      type="text"
      autoComplete="off"
              autoFocus
              value={search}
            onChange={handleInput}
      placeholder="Search images and photos"
    />
  </Form>
</SearchbarWrap>
    )
}