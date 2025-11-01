// Main JavaScript for letters page
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.letters-container');
  
  // Letters data
  const letters = [
    {
      id: 1,
      content: "And then she was born, the love of my life, under the waning gibbous moon, my very own valentine special, little did I know that down the line I would meet her and she will turn my life around and make me feel loved."
    },
    {
      id: 2,
      content: "They say the man is the head of the family, well, I agree but the woman is the neck, and with you, I want you to be the neck that hold that head up, because you have shown that, you wouldn't let that head fall. Times when I am confused and don't even know what to do, knowing I can call you and you will dumb everything down for me to be able to make a decision. I go out there feeling on top of the world because Jesutomiloluwa is there for me."
    },
    {
      id: 3,
      content: "Over these past few years that I got to know you, I have really enjoyed your company, even if we barely see 🥲🥲🥲. The little time we get to see is highly cherished and I am really jealous of those who get to see you every day. They probably don't know what they are sleeping on, the ferocity and tenacity in a petit cute container like you."
    },
    {
      id: 4,
      content: "In a world where the dating scene is crazy, I got lucky enough to meet you, the perfect specimen of the homo sapiens race. You come as perfect as they are, knowing you is to love you, and on that matter I will keep on learning new ways to express just how much I love you till infinity."
    },
    {
      id: 5,
      content: "I am like a love sick puppy, yep, and that's your fault for being so perfect. One time I was praying and then the Holy Spirit was like 'I know you love Jesutomiloluwa.' I was like interesting, so it's that intense that it reached that side too. My fear is being in the same room with you and your parents or mine because they will, well, straight up be in awe and keep staring speechless. Because I really don't have the right set of tools to hide it. Well today is not about telling you how much I love you, it's your birthday so let's focus."
    },
    {
      id: 6,
      content: "Here is to the most amazing person I ever met, the reason all my previous relationships failed (I know you had a hand in it, not only hand leg join). I am still looking for the right words to describe you, maybe as an English graduate you can lend me some words. Because it is going to be much easier to develop a machine that can read minds so you can just go ahead and read it, than getting the right words to say."
    },
    {
      id: 7,
      content: "Let me not bore you with a lot of letters, I still have forever to keep telling you 'I love you.' You are like a warm light that burns really bright in the fire place during winter. Tend to it properly and you have a warm cozy home, but don't tend to it and it burns your home. That alone keeps me on edge in a comfortable type of way, in a way that 'omo I want to be a husband for this babe.' Then the awesome face and perfect body for a human, I pray all our kids take your eyes, then I get to look at them all day. You are the strongest woman I ever met and it really keeps me on my toes. By the way, you've got a nice butt 😉"
    }
  ];

  // Create envelopes
  letters.forEach((letter, index) => {
    const envelope = document.createElement('div');
    envelope.className = 'envelope fade-in';
    envelope.style.animationDelay = `${index * 0.2}s`;
    
    envelope.innerHTML = `
      <div class="envelope-seal">Open</div>
      <div class="letter hidden">
        <p>${letter.content}</p>
      </div>
    `;
    
    envelope.addEventListener('click', function() {
      if (!this.classList.contains('opened')) {
        this.classList.add('opened', 'opening');
        const letterEl = this.querySelector('.letter');
        letterEl.classList.remove('hidden');
        letterEl.classList.add('visible', 'sliding');
        
        // Dispatch event for progress tracking
        document.dispatchEvent(new CustomEvent('letterOpened', {
          detail: { letterId: letter.id }
        }));
      }
    });
    
    container.appendChild(envelope);
  });
});