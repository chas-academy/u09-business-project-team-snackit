import { useState } from "react";
type ProfilePicProps = {
  image: (value: string) => void;
}
function ProfilePic({image}: ProfilePicProps) {
  const [selectedImage, setSelectedImage] = useState("img_1.svg");

  const handleImageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedImage(e.target.value);
    image(e.target.value);
  };
  return (
    <>
      <div className="chose-pic">
        <img className="img-preview" src={selectedImage} alt="Preview" />
        <form>
          <select name="img1" onChange={handleImageChange}>
            <option value="img_1.svg">Chef Vulpin</option>
            <option value="img_2.svg">Chef Barkley</option>
            <option value="img_3.svg">Chef Gumbo</option>
            <option value="img_4.svg">Chef Prickles</option>
            <option value="img_5.svg">Chef Whiskers</option>
            <option value="img_6.svg">Chef Nibble</option>
          </select>
        </form>
      </div>
    </>
  );
}
export default ProfilePic;