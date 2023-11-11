/**
 * 
 * @returns fullname of a person
 */
export function fullNameOf(person: any) {
  const { firstName, lastName } = person
  return <span>{firstName} {lastName}</span>
}