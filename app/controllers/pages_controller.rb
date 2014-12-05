class PagesController < ActionController::Base
  layout 'application'
  def home
    @random_sentence = random_sentence
  end

  def login
    @random_sentence = random_sentence
  end

  private

  def random_sentence(random_sentence = '')
    20.times do
      random_sentence += " #{Faker::Hacker.public_send(%w(noun adjective verb ingverb).sample)}"
    end
    return random_sentence
  end
end
