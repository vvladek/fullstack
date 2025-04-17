import styles from "./MainSection.module.css"



export function MainSection() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h4>A Fresh Take on Your Holiday</h4>
        <h1>ROAD TRIPS<br/>IN THE USA</h1>
        <p>Book the trip of your dreams. Unbeatable prices, unlimited miles, premium cars and much more.</p>
        <div className={styles.buttonsContainer}>
          <button>Learn more</button>
          <button>Book trip</button>
        </div>
      </div>
    </main>
  )
}