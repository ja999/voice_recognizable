class UsersController < ActionController::Base
  layout 'application'

  def new
    @user = User.new
    @random_sentence = random_sentence
  end

  def create
    if params[:file].present? && user = User.create(user_params)
      HTTParty.post('http://localhost:3000/register', body: {user_hash: user.id, file: params[:file]})
      redirect_to root_path, notice: 'User created.'
    else
      redirect_to root_path, notice: 'User not created.'
    end
  end

  def login_user
    if params[:file].present?
      response = HTTParty.post('http://localhost:3000/register', body: {file: params[:file]})
      response = JSON.parse(response.body)
      message =
        if response[:user_hash].present?
          user = User.find(response[:user_hash])
          "Logged as: #{user.username}"
        else
          response[:message]
        end
      redirect_to root_path, notice: message
    else
      redirect_to root_path, notice: 'User not created.'
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

  def random_sentence(random_sentence = '')
    20.times do
      random_sentence += " #{Faker::Hacker.public_send(%w(noun adjective verb ingverb).sample)}"
    end
    return random_sentence
  end
end
