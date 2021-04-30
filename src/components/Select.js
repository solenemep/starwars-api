const Select = (props) => {
  const { selectApi } = props
  return (
    <div class="btn-group btn-group-lg mb-5 container-fluid p-0">
      <button class="btn btn-warning" type="button" id="button-planets" value="planets" onClick={selectApi}>Planets</button>
      <button class="btn btn-primary" type="button" id="button-peoples" value="peoples" onClick={selectApi}>Peoples</button>
      <button class="btn btn-danger" type="button" id="button-starships" value="starships" onClick={selectApi}>Starships</button>
    </div>
  )
}
export default Select