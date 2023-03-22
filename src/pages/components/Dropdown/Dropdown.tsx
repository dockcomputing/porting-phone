import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import './Dropdown.css'


const Dropdown = ( { options, onChange, width = 'auto', headerPlaceholder, required, label, value } : {
    options : {
        id: number,
        value: string,
        label: string,
    }[],
    onChange: Function,
    width?: string,
    headerPlaceholder: string,
    required?: boolean,
    label?: string,
    value?: string,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  
  const toggleDropdown = () => setOpen(!isOpen);
  
  const handleItemClick = (id : number) => {
    console.log('Id is:', id)
    setSelectedItem(id)
    const optionValue = options.find((opt) => opt.id === id)?.value
    console.log(options, optionValue)
    onChange(optionValue)
    setOpen(false)
  }

  useEffect(() => {
    const id = options.find(opt => opt.value === value)?.id
    id && setSelectedItem(id)
  }, [options, value])
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start', 
      minWidth: width
    }}>
    { label && <div className="text-input-label" style={{display: 'flex', marginBottom: '5px', minWidth: width}}>{label} {required && <span className="input-required-marker">*</span>}</div>}
    <div className='dropdown' style={{width, maxWidth: width}}>
      <div className={`dropdown-header ${!selectedItem && 'is-placeholder'}`} onClick={toggleDropdown} style={{width, maxWidth: width, minWidth: width}}>
        {selectedItem ? options?.find(item => item.id === selectedItem)?.label : headerPlaceholder}
        <FontAwesomeIcon style={{marginLeft: '5px' }} icon={isOpen ? faChevronUp : faChevronDown}/>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`} style={{width: '100%', maxWidth: width, minWidth: width}}>
        {options.map(item => (
            // @ts-ignore
          <div className="dropdown-item" onClick={e => handleItemClick(parseInt(e.target.id))} id={item.id}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Dropdown;