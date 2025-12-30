import { SocialIcon } from 'react-social-icons'

type SocialLinksProps = {
  socialLinks?: {
    facebook?: string
    instagram?: string
    x?: string
    pinterest?: string
    linkedin?: string
    youtube?: string
  }
}

export const SocialLinks = ({ socialLinks }: SocialLinksProps) => {


  return (
    <>
      {socialLinks?.facebook && styledItem({ url: socialLinks.facebook })}
      {socialLinks?.x && styledItem({ url: socialLinks.x })}
      {socialLinks?.linkedin && styledItem({ url: socialLinks.linkedin })}
      {socialLinks?.instagram && styledItem({ url: socialLinks.instagram })}
      {socialLinks?.pinterest && styledItem({ url: socialLinks.pinterest })}
      {socialLinks?.youtube && styledItem({ url: socialLinks.youtube })}
    </>
  )
}
SocialLinks.displayName = 'SocialLinks'

export default SocialLinks

const styledItem = ({ url }: { url: string }) => (
  <li>
    <SocialIcon
      url={url}
      style={{ height: 30, width: 30 }}
      bgColor="transparent"
      target="_blank"
    />
  </li>
)