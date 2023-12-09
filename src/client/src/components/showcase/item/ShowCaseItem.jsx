import showcase from './ShowCaseItem.module.css'

export default function ShowCaseItem({image, title, description, alt}) {
    return (
        <article className={showcase.article}>
            <img className={showcase.img} src={image} alt={alt}/> 
            <p className={showcase.title}>{title}</p>
            <p className={showcase.info}>{description}</p>
        </article>
    );
}