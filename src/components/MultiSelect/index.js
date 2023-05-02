import React, { useRef } from "react"
import { MultiSelect as PrimeMultiSelect } from "primereact/multiselect"
import { locale } from "primereact/api"

import { filterTooltipOptions, shouldFilterSelectOptions } from "../../utils"

import { LOCALES_BUTTONS_SET } from "./constants"

export const MultiSelect = React.forwardRef(({
  options,
  value,
  onChange,
  onFocus,
  onBlur,
  onShow,
  onHide,
  onFilter,
  onSelectAll,
  filter,
  filterBy = "label",
  className,
  placeholder,
  optionLabel,
  optionValue,
  optionGroupLabel,
  optionGroupChildren,
  inputId,
  dropdownIcon,
  maxSelectedLabels,
  panelClassName,
  panelStyle,
  style,
  selectedItemsLabel,
  display = "comma",
  overlayVisible = false,
  tooltip,
  tooltipOptions,
  dataKey,
  optionDisabled = null,
  name = null,
  id = null,
  disabled = false,
  showClear = false,
  dataCy,
  dataTestId,
}, ref) => {
  const multiselectRef = useRef(ref)
  const filteredTooltipOptions = filterTooltipOptions(tooltipOptions)
  const hasFilter = filter ?? shouldFilterSelectOptions(options)

  const getRef = () => {
    return ref || multiselectRef
  }

  const handleSelectAll = event => {
    return getRef()?.current?.onSelectAll(event)
  }

  const handleClearAll = () => {
    const newValue = { target: { name, value: [], id } }

    onChange(newValue)
  }

  const isOptionDisabled = () => {
    if (!optionDisabled) return false

    const isFunction = optionDisabled instanceof Function

    return isFunction ? optionDisabled() : optionDisabled
  }

  const removeIcon = () => {
    return isOptionDisabled() ? false : "pi pi-times-circle"
  }

  const renderHeader = () => {
    return hasFilter ? null : <React.Fragment />
  }

  const renderFooter = () => {
    const translations = LOCALES_BUTTONS_SET[locale().locale]

    if (isOptionDisabled()) {
      return null
    }

    return (
      <div className="p-buttonset flex flex-row justify-content-center">
        <button className="p-button" onClick={handleSelectAll}>
          {translations.selectAll}
        </button>
        <button className="p-button" onClick={handleClearAll}>
          {translations.clearAll}
        </button>
      </div>
    )
  }

  return (
    <PrimeMultiSelect
      ref={getRef()}
      options={options}
      optionDisabled={optionDisabled}
      optionLabel={optionLabel}
      optionValue={optionValue}
      optionGroupLabel={optionGroupLabel}
      optionGroupChildren={optionGroupChildren}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onShow={onShow}
      onHide={onHide}
      onFilter={onFilter}
      onSelectAll={onSelectAll}
      filter={hasFilter}
      filterBy={filterBy}
      selectAll={false}
      showSelectAll={false}
      panelHeaderTemplate={renderHeader()}
      panelFooterTemplate={renderFooter()}
      className={className}
      placeholder={placeholder}
      inputId={inputId}
      dropdownIcon={dropdownIcon}
      maxSelectedLabels={maxSelectedLabels}
      panelClassName={panelClassName}
      panelStyle={panelStyle}
      style={style}
      name={name}
      id={id}
      disabled={disabled}
      selectedItemsLabel={selectedItemsLabel}
      showClear={showClear}
      display={display}
      overlayVisible={overlayVisible}
      removeIcon={removeIcon()}
      tooltip={tooltip}
      tooltipOptions={filteredTooltipOptions}
      dataKey={dataKey}
      data-cy={dataCy}
      data-testid={dataTestId}
    />
  )
})
