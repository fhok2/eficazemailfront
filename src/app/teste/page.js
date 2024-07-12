import React from 'react';

const GoogleMapsIframe = ({ width = '800', height = '600', zoom = 50 }) => {
  const baseUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.905482337989!2d-48.49330342357704!3d-27.503314798518783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952746daefd1729d%3A0xbaad8a8ba6befa1f!2sServid%C3%A3o%20Julio%20da%20Rosa%2C%20130%20-%20Ratones%2C%20Florian%C3%B3polis%20-%20SC%2C%2088052-118%2C%20Brazil!5e0!3m2!1sen!2sus!4v1720796648206!5m2!1sen!2sus";
  
  const url = new URL(baseUrl);
  url.searchParams.set('z', zoom.toString());

  return (
    <div className="container">
      <iframe
        src={url.toString()}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default GoogleMapsIframe;