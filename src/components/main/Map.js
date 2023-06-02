function Map() {
    return (
        <div className="map_container">
            <iframe
                title="Google Map" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.1120856421053!2d24.019721776869485!3d49.840351431103876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add717532cff9%3A0x1ea627f45b408179!2z0JvRjNCy0ZbQstGB0YzQutC40Lkg0L3QsNGG0ZbQvtC90LDQu9GM0L3QuNC5INGD0L3RltCy0LXRgNGB0LjRgtC10YIg0ZbQvNC10L3RliDQhtCy0LDQvdCwINCk0YDQsNC90LrQsA!5e0!3m2!1suk!2sua!4v1683157374089!5m2!1suk!2sua" 
                style={{ border:0}}
                width="100%"
                height="500"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    )
}
export default Map;