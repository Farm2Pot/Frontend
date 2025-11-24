import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa"; // react-icons 사용
import styles from "./ProductUpload.module.scss";

const ProductUpload: React.FC = () => {
  const [images, setImages] = useState<string[]>([]); // 여러 이미지 저장
  const [mainImage, setMainImage] = useState<string | null>(null); // 큰 이미지
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    const updatedImages = [...images, ...newImages];

    setImages(updatedImages);
    if (!mainImage) setMainImage(newImages[0]); // 첫 이미지가 큰 이미지
  };

  const handleRemoveImage = (img: string) => {
    const filtered = images.filter((item) => item !== img);
    setImages(filtered);

    // 메인 이미지 삭제 시 처리
    if (mainImage === img) {
      setMainImage(filtered[0] || null);
    }
  };

  return (
    <div className={styles.productContainer}>
      {/* Left Area */}
      <div className={styles.productContainer__leftSection}>
        {/* 메인 이미지 영역 */}
        <div className={styles.productContainer__leftSection__imageArea}>
          {mainImage ? (
            <div className={styles.imageWrapper}>
              <img src={mainImage} alt="preview" />
              <button
                className={styles.removeBtn}
                onClick={() => handleRemoveImage(mainImage)}
              >
                x
              </button>
            </div>
          ) : (
            <div className={styles.placeholder}>이미지를 업로드하세요</div>
          )}
        </div>

        {/* 썸네일 리스트 */}
        {images.length > 1 && (
          <div className={styles.thumbnailList}>
            {images
              .filter((img) => img !== mainImage)
              .map((thumb, idx) => (
                <div
                  key={idx}
                  className={styles.thumbnailList__thumbnailWrapper}
                >
                  <img
                    src={thumb}
                    onClick={() => setMainImage(thumb)}
                    className={
                      styles.thumbnailList__thumbnailWrapper__thumbnail
                    }
                  />
                  <button
                    className={
                      styles.thumbnailList__thumbnailWrapper__thumbRemoveBtn
                    }
                    onClick={() => handleRemoveImage(thumb)}
                  >
                    x
                  </button>
                </div>
              ))}
          </div>
        )}

        <label className={styles.productContainer__leftSection__uploadBtn}>
          Upload
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
        </label>
      </div>

      {/* Right Area */}
      <div className={styles.productContainer__rightSection}>
        <div className={styles.productContainer__rightSection__formItem}>
          <label>상품명</label>
          <input type="text" />
        </div>

        <div className={styles.productContainer__rightSection__formItem}>
          <label>상품코드</label>
          <input type="text" />
        </div>

        <div className={styles.productContainer__rightSection__formItem}>
          <label>상품가격</label>
          <input type="number" />
        </div>

        <div className={styles.productContainer__rightSection__formItem}>
          <label>상품무게</label>
          <input type="number" step="0.01" />
        </div>

        <div className={styles.productContainer__rightSection__formItem}>
          <label>원산지</label>
          <select>
            <option value="">선택하세요</option>
            <option value="korea">한국</option>
            <option value="china">중국</option>
            <option value="usa">미국</option>
          </select>
        </div>

        <div className={styles.productContainer__rightSection__formItem}>
          <label>카테고리</label>
          <select>
            <option value="">선택하세요</option>
            <option value="food">식품</option>
            <option value="fashion">패션</option>
            <option value="living">리빙</option>
          </select>
        </div>

        <div className={styles.productContainer__rightSection__formItem}>
          <label>상세이미지</label>
          <div className={styles.customDetailFileInput}>
            <span>파일 선택</span>
            <FaImage className={styles.fileIcon} />
            <input
              className={styles.detailFile}
              type="file"
              accept="image/*"
              multiple
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
