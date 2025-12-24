import Container from "./Container";

function Footer() {
  return (
    <div dir="ltr" className="text-white pt-8 pb-6">
      <Container>
        <div className="flex justify-between items-center border-b-2 border-white pb-4 flex-col gap-3.5 md:flex-row">
          <div className="flex gap-1.5">
            <img src="/images/location.svg" alt="location" />
            <span>Ismailia, Egypt</span>
          </div>

          <div className="order-3 md:order-0">
            © {new Date().getFullYear()}{" "}
            <span style={{ color: "var(--color-primary)" }}>Boyka</span>. All
            Rights Reserved.
          </div>

          <div className="flex gap-3 order-2 md:order-0">
            <img src="/images/x.svg" alt="x" />
            <img src="/images/insta.svg" alt="insta" />
            <img src="/images/face.svg" alt="face" />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
