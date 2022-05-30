
const StyleSwitcher = ({styles, currentStyle, handleStyleClick}) => {

  return (
    <div className='card-style-grid-overlay'>
      <div className='card-style-grid'>
        {styles.results.map((style, index) => {
          {/* TODO: Implement carousel for the styles */}
          if (index > 3) { return }; // placeholder until ^
          let clsName = (style === currentStyle) ?
            'card-style-circle card-style-circle-selected' : 'card-style-circle';

          return (
            <img
              className={clsName}
               key={style.style_id}
               name={style.style_id}
               onMouseEnter={handleStyleClick}
               src={style.photos[0].thumbnail_url}
               alt=''
            />
          )
        })}
      </div>
    </div>
  )
}


export default StyleSwitcher;
