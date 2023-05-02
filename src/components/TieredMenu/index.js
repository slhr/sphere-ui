import React from "react"
import { TieredMenu as PrimeTieredMenu } from "primereact/tieredmenu"

export const TieredMenu = React.forwardRef(({
  id,
  model,
  style,
  className,
  autoZIndex = true,
  baseZIndex = 150,
  dataCy,
  dataTestId,
}, ref) => {
  return (
    <PrimeTieredMenu
      ref={ref}
      id={id}
      model={model}
      style={style}
      className={className}
      autoZIndex={autoZIndex}
      baseZIndex={baseZIndex}
      data-cy={dataCy}
      data-testid={dataTestId}
    />
  )
})
